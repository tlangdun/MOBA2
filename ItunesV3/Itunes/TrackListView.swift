import SwiftUI

struct TrackListView: View {
    let tracks: [Track]

    var body: some View {
        NavigationView {
            List(tracks, id: \.collectionId) { track in
                NavigationLink(destination: AlbumDetailView(album: track)) {
                    VStack(alignment: .leading) {
                        URLImage(url: track.artworkUrl100)
                            .frame(width: 100, height: 100)
                            .cornerRadius(8)
                        Text(track.collectionName)
                            .font(.headline)
                        Text(track.artistName)
                            .font(.subheadline)
                        Text("Released: \(track.releaseDate)")
                            .font(.subheadline)
                        Text("Genre: \(track.primaryGenreName)")
                            .font(.subheadline)
                        Text("Genre: \(track.collectionId)")
                            .font(.subheadline)
                        Spacer()
                    }
                }
            }
            .navigationBarTitle(Text("Tracks"))
        }
    }
}
