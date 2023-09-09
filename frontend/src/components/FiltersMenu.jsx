import React from 'react'

const FiltersMenu = ({ toggle, setToggle }) => {
  return (
    <>
      {/* Cancel button */}
      <div className="md:hidden flex justify-end mt-2 mx-2">
        <button onClick={e => setToggle( !toggle )} className="h-10 aspect-square fill-black" >
          {/* X icon */}
          <svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z"/>
          </svg>
        </button>
      </div>
      <form className=" min-w-[200px] flex flex-col p-2 gap-2">
        <button className="p-1 rounded font-semibold text-lg text-components bg-primary hover:bg-primary-light active:bg-primary-light-light">
          Apply
        </button>
        <div>
          <div className="font-semibold text-lg">Sort by</div>
          <select>
            <option value="-dateAdded">Newest</option>
            <option value="dateAdded">Oldest</option>
            <option value="cookTimeActive">Fastest (active)</option>
            <option value="-cookTimeActive">Longest (active)</option>
            <option value="cookTimeTotal">Fastest (total)</option>
            <option value="-cookTimeTotal">Longest (total)</option>
          </select>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-lg">Type</div>
          <label>
            <input type="checkbox" name="tags" id="check-appetizer" /> Appetizer
          </label>
          <label>
            <input type="checkbox" name="tags" id="check-main-course" /> Main course
          </label>
          <label>
            <input type="checkbox" name="tags" id="check-side-dish" /> Side dish
          </label>
          <label>
            <input type="checkbox" name="tags" id="check-dessert" /> Dessert
          </label>
          <label>
            <input type="checkbox" name="tags" id="check-baking" /> Baking
          </label>
          <div className="font-semibold text-lg">Tags</div>
          <label>
            <input type="checkbox" name="tags" id="check-vegan" /> Vegan
          </label>
          <label>
            <input type="checkbox" name="tags" id="check-asian" /> Asian
          </label>
          <label>
            <input type="checkbox" name="tags" id="check-oriental" /> Oriental
          </label>
        </div>

      </form>
    </>
  )
}

export default FiltersMenu