import SwiftUI

struct SearchBar: View {
    @Binding var text: String
    var onSearch: (() -> Void)?

    var body: some View {
        HStack {
            TextField("Search", text: $text, onCommit: onSearchAction)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .autocapitalization(.none)
                .disableAutocorrection(true)

            Button(action: onSearchAction) {
                Image(systemName: "magnifyingglass")
            }
            .padding(.horizontal, 10)
            .foregroundColor(Color.blue)
        }
        .padding(.horizontal)
    }

    private func onSearchAction() {
        onSearch?()
    }
}
