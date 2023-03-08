import React from 'react';
import P1 from '../components/UI/P1/P1';
// import SearchCard from '../components/SearchCard/SearchCard';
import { withRouter, useRouter } from 'next/router';
import ProfileVideoCard from '../components/ProfileVideoCard/ProfileVideoCard';
import { useSelector, useDispatch } from 'react-redux';
import { filterReset, _sortByDate } from '../redux/actions/filterMedia';
import Layout from '../components/LayoutV2/LayoutV2';
import { searchResult } from '../redux/actions/searchAction';

function SearchResult(props) {
    const router = useRouter();
    const data = useSelector((state) => state.search.filtered);
    const [resultData, setResultData] = React.useState([...data]);
    const { q, type } = router.query;
    const { filter, videos } = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (!filter) {
            setResultData([...data]);
            dispatch(_sortByDate('searchQuery', q));
            dispatch(_sortByDate('searchType', type));
        } else setResultData([...videos]);
    }, [filter, videos, data]);
    React.useEffect(() => {
        return () => {
            dispatch(filterReset());
            dispatch(searchResult([]));
        };
    }, []);
    return (
        <Layout>
            <div className="container row">
                <div className="col-md-1" />
                <div className="col-md-10">
                    <P1 className="text-white h4 font-weight-light">
                        Search Result For "<span className="text-capitalize">{q}</span>"
                    </P1>
                    <P1 className="text-black-light mb-2">
                        Found {resultData.length} results for "
                        <span className="text-capitalize">{q}</span>"
                    </P1>
                    {/** Result Cards */}

                    {resultData.map((item, i) => (
                        <ProfileVideoCard
                            className="search"
                            key={i}
                            video={item}
                            type={item.type}
                        />
                        // <SearchCard
                        // 	key={i}
                        // 	src={`https://artbot.mypinata.cloud/ipfs/${item.thumbnailHash}`}
                        // 	id={item._id}
                        // 	title={item.title}
                        // 	desc={item.description}
                        // 	category={item.genre}
                        // 	uploadDate={item.created_at}
                        // 	tag="New"
                        // 	rating={item.rating}
                        // 	duration={item.duration}
                        // 	searchType={item.type}
                        // 	type={item.type}
                        // />
                    ))}
                </div>
                <div className="col-md-1" />
            </div>
        </Layout>
    );
}

export default withRouter(SearchResult);
