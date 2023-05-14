import Foundation

class SongsResponse: Codable {
    let resultCount: Int
    let results: [Track]?
}
