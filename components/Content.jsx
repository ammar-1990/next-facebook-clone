import InputContent from "./InputContent"
import Stories from "./Stories"


const Content = () => {


  return (
    <div className="py-2 px-2 mx-auto  w-full   md:w-7/12 lg:w-6/12 flex flex-col gap-5 ">
        <Stories />
        <InputContent />
    </div>
  )
}

export default Content