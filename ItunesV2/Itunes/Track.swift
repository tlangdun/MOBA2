struct Track: Codable {
    let artistName: String
    let collectionName: String
    let trackCount: Int
    let artworkUrl100: String
    let releaseDate: String
    let primaryGenreName: String

    enum CodingKeys: String, CodingKey {
        case artistName
        case collectionName
        case trackCount
        case artworkUrl100
        case releaseDate
        case primaryGenreName
    }
}
