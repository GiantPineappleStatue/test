import React from 'react';
import Icons from '../UI/ReactIcons/ReactIcons';
import Label from '../UI/Label/Label';
import { useDispatch, useSelector } from 'react-redux';
import { _sortByDate } from '../../redux/actions/filterMedia';
import PopperUi from '../UI/PopperUI/PopperUI';
import clsx from 'clsx';
export default function SortByFilter() {
    const dropdownRef = React.useRef();
    const [open, setOpen] = React.useState(false);
    const [order, setOrder] = React.useState(-1);
    const date = useSelector((state) => state.filter.sortDate);
    const rating = useSelector((state) => state.filter.sortRating);
    const length = useSelector((state) => state.filter.sortLength);
    const mintues = useSelector((state) => state.filter.sortMintuesWatched);
    const dispatch = useDispatch();
    return (
        <div>
            <div
                className="sub-menu-bg  rounded subheader-icon py-1 mx-2"
                ref={dropdownRef}
                onClick={() => setOpen(!open)}>
                <Icons.FaSortAmountDown color={'#B3ACCF'} className="pointer" size={19} />
            </div>
            <PopperUi
                className="search-filter w-50 "
                open={open}
                anchorEl={dropdownRef.current}
                setOpen={() => setOpen(false)}
                childClassName="py-2">
                <div className="container sortby ">
                    <div className="search-filter__caret" />
                    <div className="d-flex p-1 align-items-center justify-content-between ">
                        <Label className="text-white">Sort By</Label>
                        <div>
                            <Icons.FaSortAmountUp
                                onClick={() => setOrder(1)}
                                color={order === 1 ? '8CDE0D' : '#B3ACCF'}
                                className="pointer mr-1"
                                size={19}
                            />
                            <Icons.FaSortAmountDown
                                onClick={() => setOrder(-1)}
                                color={order === -1 ? '8CDE0D' : '#B3ACCF'}
                                className="pointer"
                                size={19}
                            />
                        </div>
                    </div>

                    <div className="sortby-line" />

                    <Label
                        onClick={() => dispatch(_sortByDate('sortDate', order))}
                        className={`text-white p-1 d-block sortby-label  ${clsx({
                            active: date
                        })}`}>
                        Upload Date
                    </Label>

                    <Label
                        onClick={() => dispatch(_sortByDate('sortRating', order))}
                        className={`text-white p-1 d-block sortby-label ${clsx({
                            active: rating
                        })}`}>
                        Rating
                    </Label>
                    <Label
                        onClick={() => dispatch(_sortByDate('sortLength', order))}
                        className={`text-white p-1 d-block sortby-label ${clsx({
                            active: length
                        })}`}>
                        Length
                    </Label>
                    <Label
                        onClick={() => dispatch(_sortByDate('sortMintuesWatched', order))}
                        className={`text-white p-1 d-block sortby-label ${clsx({
                            active: mintues
                        })}`}>
                        Mintues Watched
                    </Label>
                </div>
            </PopperUi>
        </div>
    );
}
