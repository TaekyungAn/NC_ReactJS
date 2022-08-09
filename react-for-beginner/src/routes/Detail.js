import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Summary from '../components/Summary';

function Detail() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setDetails(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{details.title}</h1>
          <img src={details.background_image_original} />
          <p>{details.genres}</p>
          {/* {details.map(detail => (
            <div key={detail.id}>
              <h2>{detail.title}</h2>
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
}

export default Detail;
