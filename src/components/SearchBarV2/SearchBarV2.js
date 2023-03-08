import React from 'react';
import { Search } from '../../../public/svg';
import BotButton from '../UI/BotButton/BotButton';
import Router from 'next/router';
import { getMediaBySearch } from '../../services/video';
import { useSelector, useDispatch } from 'react-redux';
import { searchResult } from '../../redux/actions/searchAction';
const SearchBarV2 = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState('All');
    const buttonRef = React.useRef();
    const [value, setValue] = React.useState('');
    const filtered = useSelector((state) => state.search.filtered);
    const dispatch = useDispatch();
    const submit = async (e) => {
        e.preventDefault();
        await search();
        setValue('');
        Router.push({
            pathname: '/search',
            query: { q: value, type: selectedCategory === 'Category' ? 'all' : selectedCategory }
        });
    };
    const search = async () => {
        let category = 'all';
        if (selectedCategory === 'Category' || selectedCategory === 'All') category = 'all';
        else if (selectedCategory === 'Video') category = 'video';
        else if (selectedCategory === 'Audio') category = 'album';
        else if (selectedCategory === 'Image') category = 'image_album';
        const data = await getMediaBySearch(value, category);
        dispatch(searchResult(data.media));
    };
    const itemClickHanlder = (id) => {
        Router.push({
            pathname: '/search',
            query: { q: value, type: selectedCategory === 'Category' ? 'all' : selectedCategory }
        });
    };
    return (
        <div className="search_wrap">
            <div className="search">
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Default select example">
                    <option value="All">All</option>
                    <option value="Video">Video</option>
                    <option value="Audio">Audio</option>
                </select>
                <input
                    type="text"
                    onKeyUp={search}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="searchTerm"
                    placeholder="Type here for search"
                />
                <div style={{ background: '#fff' }} className="header-searchbar-left__sugg">
                    {filtered.length > 0 &&
                        value &&
                        filtered.map((item, i) => (
                            <p
                                key={i}
                                onClick={() => itemClickHanlder(item._id)}
                                className="pl-2 mb-1  font-14 pointer text-wrap">
                                {item.title}
                            </p>
                        ))}
                </div>
                <BotButton
                    buttonText={' '}
                    styleclass={'btn-dark searchButton'}
                    variant={'dark'}
                    icon={<Search />}
                    hasIcon={true}
                    onClick={''}
                    size={'lg'}
                />
            </div>
        </div>
    );
};

export default SearchBarV2;
