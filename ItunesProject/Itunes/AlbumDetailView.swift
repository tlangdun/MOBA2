import SwiftUI

struct AlbumDetailView: View {
    let album: Track
    @State private var songs: [String] = []

    var body: some View {
        VStack {
            URLImage(url: album.artworkUrl100)
                .aspectRatio(contentMode: .fit)

            Text(album.collectionName)
                .font(.title)
                .padding()

            Text("Year: \(album.releaseDate)")
                .font(.subheadline)

            List(songs, id: \.self) { song in
                Text(song)
            }
            .padding()
        }
        .onAppear {
            loadSongs()
        }
    }

    func loadSongs() {
            let collectionId = album.collectionId

            guard let url = URL(string: "https://itunes.apple.com/lookup?id=\(collectionId)&entity=song") else {
                return
            }

            URLSession.shared.dataTask(with: url) { (data, response, error) in
                guard let data = data else {
                    return
                }

                do {
                    let decoder = JSONDecoder()
                    let response = try decoder.decode(SongsResponse.self, from: data)
                    if let results = response.results {
                        let songTitles = results.compactMap { $0.trackName }
                        DispatchQueue.main.async {
                            songs = songTitles
                        }
                    }
                } catch {
                    print("Error decoding songs: \(error)")
                    print(url)
                }
            }.resume()
        }
}
