//
//  ContentView.swift
//  Calculator
//
//  Created by Palden Langdun on 13.05.23.
//

import SwiftUI

struct ContentView: View {
    @State private var input1: String = ""
    @State private var input2: String = ""
    @State private var result: String = ""
    
    var body: some View {
        NavigationView {
            VStack {
                TextField("Enter first number", text: $input1)
                    .padding()
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .keyboardType(.decimalPad)
                
                //Buttons
                HStack {
                    Button(action: { calculate(operator: "+") }) {
                        Text("+")
                            .padding()
                            .border(Color.gray, width: 1)
                    }
                    Button(action: { calculate(operator: "-") }) {
                        Text("-")
                            .padding()
                            .border(Color.gray, width: 1)
                    }
                    Button(action: { calculate(operator: "*") }) {
                        Text("*")
                            .padding()
                            .border(Color.gray, width: 1)
                    }
                    Button(action: { calculate(operator: "/") }) {
                        Text("/")
                            .padding()
                            .border(Color.gray, width: 1)
                    }
                }
                
                TextField("Enter second number", text: $input2)
                    .padding()
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .keyboardType(.decimalPad)
                
            
                
                Text("Result: \(result)")
                    .padding()
                
                Spacer()
            }
            .padding()
            .navigationTitle("Calculator")
        }
    }
    
    private func calculate(operator: String) {
        if let number1 = Double(input1), let number2 = Double(input2) {
            switch `operator` {
            case "+":
                result = String(number1 + number2)
            case "-":
                result = String(number1 - number2)
            case "*":
                result = String(number1 * number2)
            case "/":
                if number2 != 0 {
                    result = String(number1 / number2)
                } else {
                    result = "Error"
                }
            default:
                result = "Invalid Operator"
            }
        } else {
            result = "Invalid Input"
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
