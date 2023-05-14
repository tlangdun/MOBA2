class Song: Codable {
    let trackId: Int
    let trackName: String?

    enum CodingKeys: String, CodingKey {
        case trackId
        case trackName
    }
}
