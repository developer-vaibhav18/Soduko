var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}


button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}
function isSafe(i,j,n,board)
{
    for(var k=0;k<9;k++)
    {
        if(board[i][k]==n||board[k][j]==n) return false;
    }
    var rs=i-i%3;
    var cs=j-j%3;
    for(var r=0;r<3;r++)
    {
        for(var c=0;c<3;c++)
        {
            if(board[rs+r][cs+c]==n) return false;
        }
    }
    return true;
}
function solveSudokuHelper(board) {
    var flag=0;
  for(var i=0;i<9;i++)
  {
      for(var j=0;j<9;j++)
      {
          if(board[i][j]==0)
          {
              flag=1;
              break;
          }
      }
      if(flag==1)
        break;
  }
if(i==9&&j==9)
{
    changeBoard(board);
    return true;
}
  for(var n=1;n<=9;n++)
  {
      if(isSafe(i,j,n,board)==true)
      {
          board[i][j]=n;
          if(solveSudokuHelper(board)) return true;
          board[i][j]=0;
      }
  }
  return false;

}

function solveSudoku(board) {
    solveSudokuHelper(board)
}

solve.onclick = function () {
    solveSudoku(board)

}