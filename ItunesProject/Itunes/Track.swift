class Track: Codable {
    let wrapperType: String
    let collectionType: String?
    let artistId: Int
    let collectionId: Int
    let amgArtistId: Int?
    let artistName: String
    let collectionName: String
    let collectionCensoredName: String
    let artistViewUrl: String?
    let collectionViewUrl: String
    let artworkUrl60: String
    let artworkUrl100: String
    let collectionPrice: Double
    let collectionExplicitness: String
    let trackCount: Int
    let country: String
    let currency: String
    let releaseDate: String
    let primaryGenreName: String
    let trackName: String?

    enum CodingKeys: String, CodingKey {
        case wrapperType
        case collectionType
        case artistId
        case collectionId
        case amgArtistId
        case artistName
        case collectionName
        case collectionCensoredName
        case artistViewUrl
        case collectionViewUrl
        case artworkUrl60
        case artworkUrl100
        case collectionPrice
        case collectionExplicitness
        case trackCount
        case country
        case currency
        case releaseDate
        case primaryGenreName
        case trackName
    }
}
