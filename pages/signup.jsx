import React, { useEffect, useState } from "react";
import { UploadIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { storage, auth, db } from "../firebase";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import FormInput from "@/components/FormInput";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { LOGIN, SETUSER } from "@/features/user/userSlice";

const Signup = () => {
  const route = useRouter();
 
  const [per, setPer] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [fireErr, setFireErr] = useState("");

  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const formData = [
    {
      id: "1",
      name: "username",
      type: "text",
      placeholder: "Enter your name",
      false:
        "Enter a valid name between 2-20 letters with no special characters",
      className: "input ",
      minLength: "2",
      maxLength: "20",
      required: true,
      value: input.username,
      pattern: "^[a-zA-Z]{2,15}$",
    },
    {
      id: "2",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      false: "Enter a valid email",
      className: "input",
      required: true,
      value: input.email,
    },
    {
      id: "3",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      false: "Enter a valid password between 6 and 20 character",
      className: "input",
      minLength: "6",
      maxLength: "20",
      required: true,
      value: input.password,
    },
    {
      id: "4",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm  your password",
      false: "Your passwords don,t match",
      className: "input",
      pattern: input.password,
      required: true,
      value: input.confirmPassword,
    },
  ];

  useEffect(() => {
    const uploadImage = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress)
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused",per);
              break;
            case "running":
              console.log("Upload is running",per);
              break;

            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInput((input) => ({ ...input, image: downloadURL }));
          });
        }
      );
    };

    file && uploadImage();
    console.log(input);
  }, [file]);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        name: input.username,
        email: input.email,
        password: input.password,
        birthday: date || "",
        image:
          input.image ||
          "https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max",
        timestamp: serverTimestamp(),
      });

      dispatch(LOGIN({ id: res.user.uid, email: res.user.email }));
      const docRef = doc(db, "users", res.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap) {
        dispatch(
          SETUSER({
            id: docSnap.id,
            name: docSnap.data().name,
            email: docSnap.data().email,
            password: docSnap.data().password,
            image: docSnap?.data()?.image,
            birthday: docSnap.data().birthday,
          })
        );
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      route.push("/");
      setTimeout(() => {
        formData.map((el) => {
          setInput((input) => ({ ...input, [el.name]: "" }));
        });
        setLoading(false);
      }, 5000);
    } catch (err) {
      setLoading(false);
      setFireErr(err.message);
    }
  };

  const onChange = (e, el) => {
    setInput({ ...input, [el?.name]: e.target?.value });

    setFireErr(null);
  };

  return (
    <div className="h-screen flex flex-col sm:flex-row justify-start sm:justify-center items-center gap-3 sm:gap-28 p-4">
      <div className="flex  justify-center items-center  ">
        <img
          className="fully my-img-sm md:my-img"
          src={
            file
              ? URL.createObjectURL(file)
              : "data:image/png;base64,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"
          }
          alt=""
        />
      </div>

      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-5 w-3/4 sm:w-1/3"
      >
        {formData.map((el) => (
          <FormInput el={el} onChange={onChange} key={el.id} />
        ))}

        <input
          type="date"
          className="text-gray-500 outline-none cursor-pointer"
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="flex gap-2 text-gray-500" htmlFor="image">
          Upload Image <UploadIcon className="w-5 h-5 cursor-pointer" />{" "}
        </label>
        <input
          className="hidden"
          id="image"
          type="file"
          name="image"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {fireErr && <p className="text-red-500 text-xs">Error:{fireErr}</p>}

        <button disabled={per !=null && per<100} className="text-white  p-4 cursor=pointer-border-0 online-none bg-blue-500 ">
          {loading ? "Loading..." : "Sign up"}
        </button>
        <p className="text-gray-500">
          Back to{" "}
          <Link className="underline text-blue-500" href="/login">
            Login.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
