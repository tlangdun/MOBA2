import SwiftUI

struct ContentView: View {
    
    // init  board dimensions
    let rows = 10
    let columns = 10
    
    @State private var board: [[Int]] = []
    
    // Helper function to create a random 2D array
    func createRandom2DArray(rows: Int, columns: Int) -> [[Int]] {
        var array = [[Int]]()
        for _ in 0..<rows {
            var row = [Int]()
            for _ in 0..<columns {
                row.append(Int(arc4random() % 2))
            }
            array.append(row)
        }
        return array
    }
    
    // Function to count live neighbors
    func countLiveNeighbors(x: Int, y: Int, board: [[Int]]) -> Int {
        let dx = [-1, -1, -1, 0, 0, 1, 1, 1]
        let dy = [-1, 0, 1, -1, 1, -1, 0, 1]
        var count = 0
        
        for i in 0..<8 {
            let newX = x + dx[i]
            let newY = y + dy[i]
            
            if newX >= 0 && newY >= 0 && newX < rows && newY < columns && board[newX][newY] == 1 {
                count += 1
            }
        }
        return count
    }
    
    // Main function to run one iteration of conways game
    func gameOfLifeIteration(oldBoard: [[Int]]) -> [[Int]] {
        var newBoard = oldBoard
        
        for x in 0..<rows {
            for y in 0..<columns {
                let liveNeighbors = countLiveNeighbors(x: x, y: y, board: oldBoard)
                
                if oldBoard[x][y] == 1 {
                    newBoard[x][y] = liveNeighbors == 2 || liveNeighbors == 3 ? 1 : 0
                } else {
                    newBoard[x][y] = liveNeighbors == 3 ? 1 : 0
                }
            }
        }
        
        return newBoard
    }
    
    var body: some View {
        VStack {
            ForEach(0..<rows, id: \.self) { row in
                HStack {
                    ForEach(0..<columns, id: \.self) { column in
                        if board.indices.contains(row) && board[row].indices.contains(column) {
                            Rectangle()
                                .fill(board[row][column] == 1 ? Color.blue : Color.white)
                                .frame(width: 20, height: 20)
                                .border(Color.gray, width: 1)
                        }
                    }
                }
            }
        }
        .onAppear {
            board = createRandom2DArray(rows: rows, columns: columns)
            Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true) { _ in
                board = gameOfLifeIteration(oldBoard: board)
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
