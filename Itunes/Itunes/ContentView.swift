import SwiftUI

struct Response: Codable {
    let resultCount: Int
    let results: [Track]
}

struct ContentView: View {
    @State private var tracks: [Track] = []

    var body: some View {
        TrackListView(tracks: tracks)
            .onAppear {
                loadTracks()
            }
    }

    func loadTracks() {
        guard let fileUrl = Bundle.main.url(forResource: "stones", withExtension: "json") else {
            print("JSON file not found.")
            return
        }

        do {
            let data = try Data(contentsOf: fileUrl)
            let decoder = JSONDecoder()
            let response = try decoder.decode(Response.self, from: data)
            tracks = response.results
        } catch {
            print("Error loading JSON: \(error)")
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
