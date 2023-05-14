import SwiftUI

struct SearchView: View {
    @Binding var searchText: String
    var onSearch: (() -> Void)?

    var body: some View {
        VStack {
            HStack {
                TextField("Search", text: $searchText)
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
    }

    private func onSearchAction() {
        onSearch?()
    }
}

struct ContentView: View {
    @State private var tracks: [Track] = []
    @State private var searchText: String = ""
    @State private var isSearching = true // Zustand für Anzeigemodus
    private let networkManager = NetworkManager()

    var body: some View {
        NavigationView {
            Group {
                if isSearching {
                    SearchView(searchText: $searchText, onSearch: searchArtists)
                } else {
                    TrackListView(tracks: filteredTracks)
                }
            }
            .navigationBarTitle(isSearching ? "Search" : "Tracks")
            .navigationBarItems(trailing: Button(action: {
                isSearching.toggle()
                searchText = ""
            }) {
                Text(isSearching ? "Cancel" : "Search")
            })
        }
    }

    private var filteredTracks: [Track] {
        if searchText.isEmpty {
            return tracks.filter { $0.artistName.lowercased() == "bob" || $0.collectionName.lowercased() == "bob" }
        } else {
            return tracks.filter { $0.artistName.lowercased().contains(searchText.lowercased()) }
        }
    }



    private func searchArtists() {
        let query = searchText.isEmpty ? "bob" : searchText

        networkManager.searchArtists(query: query) { (tracks) in
            DispatchQueue.main.async {
                if let tracks = tracks {
                    self.tracks = tracks
                    print("Received \(tracks.count) tracks")
                } else {
                    print("Failed to fetch tracks")
                }
                isSearching = false
            }
        }
    }
}
