import Foundation

class NetworkManager {
    func searchArtists(query: String, completion: @escaping ([Track]?) -> Void) {
        let urlString = "https://itunes.apple.com/search?term=\(query)&entity=album"
        
        guard let url = URL(string: urlString) else {
            completion(nil)
            return
        }
        
        let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
            if let error = error {
                print("Error fetching data: \(error)")
                completion(nil)
                return
            }
            
            guard let data = data else {
                completion(nil)
                return
            }
            
            do {
                let decoder = JSONDecoder()
                let response = try decoder.decode(SearchResponse.self, from: data)
                let tracks = response.results
                completion(tracks)
            } catch {
                print("Error decoding data: \(error)")
                completion(nil)
            }
        }
        
        task.resume()
    }
}
