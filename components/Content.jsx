import InputContent from "./InputContent"
import Stories from "./Stories"


const Content = () => {


  return (
    <div className="py-2 px-2  flex-grow flex flex-col gap-5 items-start lg:items-center">
        <Stories />
        <InputContent />
    </div>
  )
}

export default Content