import SwiftUI

struct ContentView: View {
    @State private var tracks: [Track] = []
    @State private var searchText: String = ""
    private let networkManager = NetworkManager()

    var body: some View {
        VStack {
            SearchBar(text: $searchText, onSearch: searchArtists)
                .padding()

            TrackListView(tracks: filteredTracks)
                .onAppear {
                    searchArtists()
                }
        }
    }

    private var filteredTracks: [Track] {
        if searchText.isEmpty {
            return tracks.filter { $0.artistName.lowercased() == "bob" }
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
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
