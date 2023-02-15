import { ThumbUpIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "@/firebase";
import LikesList from "./LikesList";
import Control from "./Control";

const Comments = ({ comment }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const user = useSelector((state) => state.user.user);
  const [likes, setLikes] = useState([]);
  const [openLikes,setOpenLikes] = useState(false)
  const [edit,setEdit]=useState(false)
  const [editI,setEditI]=useState(comment.commentTitle)
  const editRef=useRef()
const notes = useSelector(state=>state.data.notes)
  const handleLike = async () => {
    try {
      const docRef = await addDoc(collection(db, "likes"), {
        postId: comment.commentId,
        userId: user.id,

        username: userInfo.name,
        userEmail: userInfo.email,
        userImage: userInfo.image,
      });


      const docRefnot = await addDoc(collection(db, "notifications"), {
        postId: comment.commentId,
        postTitle:comment.commentTitle,
        userId: user.id,
        userImage: userInfo.image,
         username: userInfo.name,
         userEmail: userInfo.email,
             timestamp: new Date().toLocaleString(),
             type:'like',
             is:true,
             seen:false,
             dest:comment.userEmail,
             commentTitle:comment.commentTitle
});


    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async () => {
    const like = likes.find(
      (like) => like.postId === comment.commentId && like.userId === user.id
    ).likeId;
    await deleteDoc(doc(db, "likes", like));
    const note=notes.find((note)=>note.dest===comment.userEmail && note.type==='like' && note.postId===comment.commentId && note.userId===user.id).id
    await deleteDoc(doc(db, "notifications", note));

  };

  useEffect(() => {
    const q = query(
      collection(db, "likes"),
      where("postId", "==", comment.commentId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ likeId: doc.id, ...doc.data() });
      });
      setLikes(list);
    });
    return () => unsubscribe();
  }, []);


  const handleEditSubmit=async(e)=>{
    e.preventDefault()
if(editI)
{setEdit(false)
  setEditI(comment.commentTitle)
  const washingtonRef = doc(db, "comments", comment.commentId);
  
  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    commentTitle: editI,
    
  });
  }


  }
  return (
    <div className="flex gap-2 w-full">
   <Link href={`/${comment.userEmail}`}>  <div className="w-10"><img
        className="w-9 h-9 rounded-full cursor-pointer"
        src={comment.userImage}
        alt=""
      /></div></Link> 
      <div className="flex flex-col ">
        <div className="p-2 rounded-2xl flex flex-col self-start bg-gray-100 relative ">
          <Link  href={`/${comment.userEmail}`}><span className="font-bold capitalize ">{comment.username} {comment.lastname}</span></Link>
         { edit? <form onSubmit={handleEditSubmit} className="m-1 mt-0 "><input type="text" className="  outline-none bg-gray-100 rounded-md w-full" value={editI} onChange={(e)=>setEditI(e.target.value)} ref={editRef}/></form> :<span className="">{comment.commentTitle}</span>}
          {likes.length > 0 && (
            <div onClick={()=>setOpenLikes(true)}
              style={{ top: "-10px", right: "-10px" }}
              className="absolute  cursor-pointer p-1 rounded-full flex  items-center shadow-md bg-white"
            >
              <div  className="w-4 bg-blue-700 h-4 rounded-full flex items-center justify-center">
                <ThumbUpIcon className="w-3 text-white" />
              </div>{" "}
              {likes.length > 1 && <span className="text-gray-500 text-xs ml-1">
                {" "}
                {likes.length > 1 && likes.length}
              </span>}
            </div>
          )}
       
        </div>
        <div className="flex gap-4 items-center px-1">
          {likes.find(
            (like) =>
              like.postId === comment.commentId && like.userId === user.id
          ) ? (
            <span
              onClick={handleDislike}
              className="text-blue-500 font-bold text-sm cursor-pointer hover:underline"
            >
              Liked
            </span>
          ) : (
            <span
              onClick={handleLike}
              className="text-gray-500 font-bold text-sm cursor-pointer hover:underline"
            >
              Like
            </span>
          )}

          <span className="text-gray-500 text-xs">
            {" "}
            {comment.timestamp}
          </span>
        </div>
      </div>
      {openLikes && <LikesList likes={likes} setOpenLikes={setOpenLikes} />}
      {userInfo.email===comment.userEmail&&<Control setEdit={setEdit} setEditI={setEditI} editRef={editRef} el={comment} type='comments' />}
    </div>
  );
};

export default Comments;
