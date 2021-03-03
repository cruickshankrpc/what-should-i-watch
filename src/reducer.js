export const initialState = {
  film: {}
}

  
export const getRandomFilm = () => {
  var numbers = []; // this array will store the available numbers..

  function generateNumbers()
  {
      // populate the available numbers however you need to..
      for(var i=0; i<20; i+=20)
      {
          numbers.push(i);
      }
  }

  function spin()
  {
      if(numbers.length==0)
      {
          // then we've used  up all available numbers..start new game or whatever you need to do..
          console.log("STARTING OVER");
          generateNumbers();
      }
      var rand = Math.floor(Math.random()*numbers.length); // select an index randomly based on the number of remaining available numbers..
      var num = numbers[rand];
      numbers.splice(rand,1); // remove the number we selected so it can't be selected next time..
      document.getElementById("number").innerHTML = num;
  }
}

