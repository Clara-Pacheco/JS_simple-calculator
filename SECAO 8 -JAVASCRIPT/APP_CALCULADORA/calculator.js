const numberButtons = document.querySelectorAll(".value")
      const signActionButtons = document.querySelectorAll(".action")
      const cbutton = document.querySelector(".clear")
      const input = document.querySelector("[type=text]")
      const equalButton = document.querySelector(".enter")

      // console.log(numberButtons) // resultará em uma nodelist
      // console.log(signActionButtons)  // resultará em uma nodelist
      // console.log(cbutton)
      // console.log(input)
      // console.log(equalButton)

      // métodos de array como forEach e call não functionam com nodelist e 
      // HTML collection; por isso a necessidade de usar o Array.prototype,
      // passando o nodelist como 'this' da função de callback. 
      // Esse 'this', ou seja, a nodelist, será usada para iteração
      // no método forEach

      Array.prototype.forEach.call(numberButtons, function(button){
        button.addEventListener('click',handleClickNumber)
      })

     Array.prototype.forEach.call(signActionButtons, function(signButton){
      signButton.addEventListener('click',handleClickOperation)
     })

     cbutton.addEventListener('click', function(){
        input.value = ''
     })

     equalButton.addEventListener('click', handleClickEqual)

     function handleClickNumber(){
      input.value += this.value
     }

     // o 'this' é o nodelist com todos os botões de número passado no método call

     function handleClickOperation(){
      input.value = removeLastItemIfOperator(input.value)
      input.value += this.value
     }

     function removeLastItemIfOperator(value){
      if(isLastItemAnOperator(value)){
        return value.slice(0,-1)
      }
      return value 
     }

     function isLastItemAnOperator(value){
      let operators = ['+','-','*','/']
      let lastItem = value.split('').pop()
      return operators.some(function(operator){
        return operator === lastItem
      })
     }

     function handleClickEqual(){
      input.value = removeLastItemIfOperator(input.value)
      let allValues = input.value.match(/\d+[+/*-]?/g)
      // console.log(allValues)
      let result = allValues.reduce(function(accumulate,actual){
        let firstValue = accumulate.slice(0,-1)
        let operator = accumulate.split('').pop()
        let lastValue = removeLastItemIfOperator(actual)
        let lastOperator = isLastItemAnOperator(actual) ? actual.split('').pop() : ''
        switch(operator){
          case '+':
            return (Number(firstValue) + Number(lastValue)) + lastOperator
          case '-':
            return (Number(firstValue) - Number(lastValue)) + lastOperator
          case '/':
            return (Number(firstValue) / Number(lastValue)) + lastOperator
          case '*':
            return (Number(firstValue) * Number(lastValue)) + lastOperator
        }
      })

      input.value = ''
      input.value += result

      }
     
