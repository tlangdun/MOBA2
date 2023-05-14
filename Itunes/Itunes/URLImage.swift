import SwiftUI
import Combine

struct URLImage: View {
    @ObservedObject private var imageLoader: ImageLoader
    private var image: UIImage?

    init(url: String) {
        imageLoader = ImageLoader(url: url)
    }

    var body: some View {
        Image(uiImage: image ?? UIImage())
            .resizable()
    }
}

class ImageLoader: ObservableObject {
    private var cancellable: AnyCancellable?
    @Published var image: UIImage?

    init(url: String) {
        guard let url = URL(string: url) else { return }

        cancellable = URLSession.shared.dataTaskPublisher(for: url)
            .map { UIImage(data: $0.data) }
            .replaceError(with: nil)
            .receive(on: DispatchQueue.main)
            .sink { [weak self] in self?.image = $0 }
    }
}
