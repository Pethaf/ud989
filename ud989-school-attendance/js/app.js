Array.prototype.getFinalElement = function()
{
  if(this.length=== 0)
    {
      return "";
    }
  else
    {
      return this[this.length-1];
    }
}
var resultView =
    {
      init: function()
      {
         this.resultDisplay = document.getElementById("resultDisplay");
         this.resultDisplay.textContent = 0;
      },
      render: function()
      {
        this.resultDisplay.textContent = octopus.getResult();
      }
    };
var inputView =
    {
      init: function()
      {
        this.inputDisplay = document.getElementById("inputDisplay");
        this.inputDisplay.textContent = 0;
      },
      render: function()
      {
        this.inputDisplay.textContent = octopus.evaluateInput();
      }
    };
var buttonView =
    {
      init: function()
      {
        var buttons = document.getElementsByTagName("button");
        for(var j=0; j!= buttons.length; j++)
          {
            buttons[j].addEventListener("click",octopus.handleClick);
          }
      }
    };
var octopus =
    {
      init: function()
      {
        resultView.init();
        inputView.init();
        buttonView.init();
      },
      handleClick: function(ev)
      {
        console.log(ev.target);
        if(ev.target === "AC")
          {
            data.clearAll();
            resultView.render();
            inputView.render();
          }
        else if(ev.target === "CE")
          {
            data.clearEntry();
            inputView.render();
          }
        else if(ev.target === ".")
          {
            data.handleDecimal();
            resultView.render();
            inputView.render();
          }
        else if(ev.target.textContent.match(/\+|\X|\-|\÷/g))
          {
            data.handleOperator(ev.target);

          }
        else if(ev.target === "%")
          {
            data.handlePercent();
            resultView.render();
            inputView.render();
          }
        else if(ev.target === "=")
          {
            data.handleEqual()
            resultView.render();
            inputView.render();
          }
        else
          {
            data.addNumber(ev.target.textContent);
            resultView.render();
            inputView.render();
          }
      },
      getInput: function()
      {
        return data.getInput();
      },
      evaluateInput: function()
      {
      return data.evaluateInput();
      }
    }

var data =
    {
      init: function()
      {
        this.input = [];
      },
      getInput: function()
      {
        return input.getFinalElement();
      },
      evaluateInput: function()
      {
        return eval(input.join(""));
      }
      
    }
