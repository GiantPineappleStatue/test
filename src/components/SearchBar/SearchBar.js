import React from 'react';
import PopperUI from '../UI/PopperUI/PopperUI';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Router from 'next/router';
import { getMediaBySearch } from '../../services/video';
import { useSelector, useDispatch } from 'react-redux';
import { searchResult } from '../../redux/actions/searchAction';
const SearchBar = () => {
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
        <div className="search-bar">
            <form onSubmit={submit}>
                <div className="d-flex">
                    {/* <img src={rightArrow} alt="" /> */}
                    <div className="d-flex align-items-center all  ">
                        <div
                            ref={buttonRef}
                            onClick={() => setOpen(!open)}
                            className="d-flex align-items-center pointer all-item">
                            <p className="text-white mb-0 ">{selectedCategory}</p>
                            <img src={'/img/arrow.svg'} alt="arrow image" className="" />
                        </div>
                        <PopperUI
                            className="header-searchbar-right__popup"
                            open={open}
                            anchorEl={buttonRef.current}
                            setOpen={() => setOpen(false)}
                            childClassName="">
                            <MenuItem onClick={() => setSelectedCategory('All')}>All</MenuItem>
                            <MenuItem onClick={() => setSelectedCategory('Video')}>Video</MenuItem>
                            <MenuItem onClick={() => setSelectedCategory('Audio')}>Audio</MenuItem>
                        </PopperUI>
                    </div>
                    <input
                        type="text"
                        onKeyUp={search}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Type here for search"
                        className="w-100 py-2 "
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
                    <button className="search-btn" type="submit">
                        <img
                            src={'/img/search.svg'}
                            alt="search icon"
                            className="search-icon   p-2  px-3"
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};
export default SearchBar;
