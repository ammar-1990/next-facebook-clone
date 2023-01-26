import { useState } from "react"

const FormInput = ({el,onChange}) => {
    const [focused,setFocused]=useState(false)
  return (
    <div>
<input autoComplete="off"  {...el} onChange={(e)=>onChange(e,el) } onFocus={()=>{el.name==='confirmPassword' && setFocused(true)}}  onBlur={()=>setFocused(true)} focused={focused.toString()}/>
<p className="hidden">{el.false}</p>


    </div>
  )
}

export default FormInput