import Image from "next/image";
import { ChatAltIcon, ThumbUpIcon, ShareIcon } from "@heroicons/react/outline";
import { ThumbUpIcon as Two } from "@heroicons/react/solid";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc 
} from "firebase/firestore";
import { db } from "@/firebase";
import Comments from "./Comments";
import LikesList from "./LikesList";

const Post = ({ el,profile }) => {
  const [open, setOpen] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const user = useSelector((state) => state.user.user);
  const titleRef = useRef();
  const [comments, setComments] = useState([]);
  const [openComment, setOpenComment] = useState(false);
  const [likes, setLikes] = useState([]);
  const [openLikes,setOpenLikes]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (titleRef.current.value.trim() !== "") {
      try {
        const docRef = await addDoc(collection(db, "comments"), {
          postId: el.id,
          userId: user.id,
          userImage: userInfo.image,
          username: userInfo.name,
          userEmail: userInfo.email,
          commentTitle: titleRef.current.value,
          timestamp: new Date().toLocaleString(),
        });
      } catch (err) {
        console.log(err);
      }
    }
    titleRef.current.value = "";
  };

  const handleLike = async () => {
    try {
      const docRef = await addDoc(collection(db, "likes"), {
        postId: el.id,
        userId: user.id,

        username: userInfo.name,
        userEmail: userInfo.email,
        userImage: userInfo.image,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike=async()=>{
    const like=likes.find((like)=>like.postId === el.id && like.userId === user.id).likeId
    await deleteDoc(doc(db, "likes", like));
  }

  useEffect(() => {
    const q = query(collection(db, "comments"), where("postId", "==", el.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ commentId: doc.id, ...doc.data() });
      });
      setComments(list);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "likes"), where("postId", "==", el.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ likeId: doc.id, ...doc.data() });
      });
      setLikes(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={`${!profile ?'my-5' : 'mb-5' }  w-full bg-white  rounded-lg rounded-b-2xl shadow-md`}>
      <div className="flex items-center p-3 gap-2">
        <Link href={`/${el.userEmail}`}>   <img
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          src={el.userImage}
          alt=""
        /></Link>
     

        <div>
          <Link href={`/${el.userEmail}`}><p className="font-bold capitalize cursor-pointer">{el.username}</p></Link>
          <p className="date text-gray-500">{el.timestamp}</p>
        </div>
      </div>
      <p className=" p-3">{el.postTitle}</p>

      {el.imageURL && (
        <div
          className="relative h-96 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {" "}
          <Image
            src={el.imageURL}
            layout="fill"
            objectFit="cover"
            unoptimized
            alt="wrong"
          />
        </div>
      )}
      <div className="pt-2 px-4 pb-0">
        <div className="flex items-center justify-between py-1">
          {likes.length > 0 && (
            <div onClick={()=>setOpenLikes(true)} className="flex gap-2 items-center cursor-pointer group ">
              <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center ">
                <Two className="text-white w-3 " />
              </div>
              <span className="text-gray-500 group-hover:underline ">
                {likes.length} {likes.length === 1 ?"Like" :"Likes"}
              </span>
            </div>
          )}

          {comments.length > 0 && (
            <div
              onClick={() => setOpenComment((openComment) => !openComment)}
              className="flex items-center cursor-pointer gap-2 group"
            >
              <span className="text-gray-500 group-hover:underline ">
                {comments.length}
                {"  "}
                {comments.length === 1 ? " Comment" : "Comments"}
              </span>
              <div>
                {" "}
                <ChatAltIcon className="w-5 text-gray-500" />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center father border-gray-300  p-1">
          {likes.find(
            (like) => like.postId === el.id && like.userId === user.id
          ) ? (
            <div onClick={handleDislike} className="tools text-xs lg:text-md hover:bg-gray-200 text-blue-600 group ">
              <Two className="w-4 md:w-6 group-active:scale-90" /><span >Like</span> 
            </div>
          ) : (
            <div
              onClick={handleLike}
              className="tools text-xs lg:text-md hover:bg-gray-200 group"
            >
              <ThumbUpIcon className="w-4 md:w-6 group-active:scale-90" /><span >Like</span>
            </div>
          )}

          <div
            onClick={() => setOpenComment((openComment) => !openComment)}
            className="tools text-xs lg:text-md hover:bg-gray-200"
          >
            <ChatAltIcon className="w-4 md:w-6" /> Comment
          </div>
          <div className="tools text-xs lg:text-md hover:bg-gray-200">
            {" "}
            <ShareIcon className="w-4 md:w-6" />
            Share
          </div>
        </div>
        {openComment && (
          <div>
           
            <div className="theComments pb-2 pt-3 border-gray-300 theInput flex flex-col gap-3">
              {" "}
              {[...comments]
                ?.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                .map((comment) => (
                  <Comments comment={comment} key={comment.commentId} />
                ))}
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex gap-2 items-center pt-3 pb-3 "
            >
              <img
                className="w-9 h-9 cursor-pointer rounded-full"
                src={userInfo?.image}
                alt=""
              />
              <input
                ref={titleRef}
                placeholder="Write a comment..."
                type="text"
                className="flex-grow rounded-full px-4 py-1 outline-none bg-gray-100"
              />
            </form>
          </div>
        )}
      </div>

      <div
        className={`fixed ${
          open ? "block" : "hidden"
        } top-0 left-0 w-full h-full layout flex justify-center items-center`}
      >
        <img src={el.imageURL} alt="" />
        <div
          className="absolute top-3 right-3  cursor-pointer "
          onClick={() => setOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

    {  openLikes &&<LikesList likes={likes} setOpenLikes={setOpenLikes}/>}
    </div>
  );
};

export default Post;
