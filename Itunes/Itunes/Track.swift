//
//  Track.swift
//  Itunes
//
//  Created by Palden Langdun on 13.05.23.
//

import Foundation

struct Track: Codable {
    let artistName: String
    let collectionName: String
    let trackCount: Int
    let artworkUrl100: String
    let releaseDate: String
    let primaryGenreName: String
}
