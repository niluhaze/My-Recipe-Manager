/* 
  When called, toggle the given state if the screen size is small.
*/

const MAX_SMALL_WIDTH = 767;

export const toggleIfScreenSmall = (state, setState, windowWidth) => {
  if (windowWidth <= MAX_SMALL_WIDTH) {
    // toggle state by setting it to its inverse
    setState(!state)
  }
}