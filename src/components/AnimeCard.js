
export function AnimeCard({item, handleClick}) {
    return (
        <div>
            <img src = {item.image}></img>
            <div>
                <button onClick={() => handleClick(item.totalWatchTime, item.name)}>Add to WatchList!</button>
            </div>

            <div>
                <p>{"Anime: " + item.name}</p>
            </div>

            <div>
                <p>{"Rating: " + item.rating}</p>
            </div>

            <div>
                <p>{"Season Aired: " + item.season}</p>
            </div>

            <div>
                <p>{"Genre: " + item.genre}</p>
            </div>

            <div>
                <p>{"TotalWatchTime (hours): " + item.totalWatchTime}</p>
            </div>

        </div>
    )
}