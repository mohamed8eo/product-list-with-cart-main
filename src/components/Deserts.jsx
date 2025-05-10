import Desert_Content from "./Desert_Content"

const Deserts = ({ handleClick, resetItem }) => {
  return (
    <div>
      <h2 className=" text-5xl sm:text-2xl font-bold mb-6">Deserts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 gap-4">
        <Desert_Content handleClick={handleClick} resetItem={resetItem} />
      </div>
    </div>
  )
}

export default Deserts