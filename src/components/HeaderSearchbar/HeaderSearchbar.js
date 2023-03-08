import React, { useState } from 'react';
import { getMediaBySearch } from '../../services/video';
import PopperUI from '../UI/PopperUI/PopperUI';
import CustomButton from '../UI/Button/Button';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Icons from '../UI/ReactIcons/ReactIcons';
import { useSelector, useDispatch } from 'react-redux';
import { searchResult } from '../../redux/actions/searchAction';
import Router from 'next/router';
const HeaderSearchbar = () => {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [value, setValue] = useState('');
    const buttonRef = React.useRef();
    const filtered = useSelector((state) => state.search.filtered);
    const dispatch = useDispatch();
    const handleSelected = (select) => {
        setOpen(false);
        setSelectedCategory(select);
    };
    const searchHandler = async (e) => {
        e.preventDefault();
        {
            /** Place Search Api Here */
            /** Navigate to  /search?q=test etc.. */
        }
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
        <form onSubmit={searchHandler} className="form-inline header-searchbar">
            <div className="d-flex w-100 ">
                <button
                    type="button"
                    className="btn  header-searchbar-right__btn1 rounded-right dropdown-toggle1 ml-4  "
                    ref={buttonRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={() => setOpen((prev) => !prev)}>
                    <span>
                        {' '}
                        {selectedCategory}&nbsp; <i className="fas fa-chevron-down"></i>
                    </span>
                </button>
                <PopperUI
                    className="header-searchbar-right__popup"
                    open={open}
                    anchorEl={buttonRef.current}
                    setOpen={() => setOpen(false)}
                    childClassName="">
                    <MenuItem onClick={() => handleSelected('All')}>All</MenuItem>
                    <MenuItem onClick={() => handleSelected('Video')}>Video</MenuItem>
                    <MenuItem onClick={() => handleSelected('Audio')}>Audio</MenuItem>
                    {/* <MenuItem onClick={() => this.handleSelected('Image')}>2D-3D</MenuItem> */}
                </PopperUI>

                <div className="header-searchbar-left flex-grow-1 ">
                    <Icons.FaSearch
                        className="header-searchbar-left__search"
                        color={'#756C9F'}
                        size={14}
                    />
                    <input
                        className="header-search-bar w-100  header-searchbar-left__input"
                        id="inputID"
                        onKeyUp={search}
                        value={value}
                        placeholder="Type here for search"
                        onChange={(e) => setValue(e.target.value)}
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
                </div>
                {/** Menu */}
                <div className="header-searchbar-right">
                    <CustomButton className="btn  header-searchbar-right__btn " type="submit">
                        <Icons.FaSearch className=" d-none d-sm-inline mb-1" />
                    </CustomButton>
                </div>
            </div>
        </form>
    );
};

export default HeaderSearchbar;
