import React, { useReducer } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Slider from '@material-ui/core/Slider/Slider';
import ChipInput from 'material-ui-chip-input';
import CloseIcon from '@material-ui/icons/Close';
import Icons from '../UI/ReactIcons/ReactIcons';
import P1 from '../UI/P1/P1';
import Label from '../UI/Label/Label';
import Button from '../UI/Button/Button';

import Counter from '../Counter/Counter';
import { filterMedia } from '../../services/util';
import { filter } from '../../redux/actions/filterMedia';
import PopperUi from '../UI/PopperUI/PopperUI';
import 'react-date-picker/dist/DatePicker.css';
import 'react-date-picker/node_modules/react-calendar/dist/Calendar.css';
const DatePicker = dynamic(() => import('react-date-picker/dist/DatePicker'), { ssr: false });

const initialState = {
    genre: [],
    tags: [],
    rating: [0, 5],
    minLength: {
        hour: 0,
        min: 0
    },
    maxLength: {
        hour: 0,
        min: 0
    }
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_GENRE':
            return {
                ...state,
                genre: [...state.genre, action.value]
            };
        case 'REMOVE_GENRE':
            const updateGenre = [...state.genre];
            updateGenre.splice(action.value, 1);
            return {
                ...state,
                genre: updateGenre
            };
        case 'ADD_TAGS':
            return {
                ...state,
                tags: [...state.tags, action.value]
            };
        case 'REMOVE_TAGS':
            const updateTags = [...state.tags];
            updateTags.splice(action.value, 1);
            return {
                ...state,
                tags: updateTags
            };
        case 'RATING_CHANGE':
            return {
                ...state,
                rating: action.value
            };
        case 'MIN_COUNTER_CHANGE':
            return {
                ...state,
                minLength: {
                    ...state.minLength,
                    [action.name]: action.value
                }
            };
        case 'MAX_COUNTER_CHANGE':
            return {
                ...state,
                maxLength: {
                    ...state.maxLength,
                    [action.name]: action.value
                }
            };
        default:
            return state;
    }
};

export default function SearchFilter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const isInitialMount = React.useRef(true);
    const dropdownRef = React.useRef();
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState('');
    const [openDate, setOpenDate] = React.useState(false);
    const [minDate, setMinDate] = React.useState({ date: new Date(), select: false });
    const [maxDate, setMaxDate] = React.useState({ date: new Date(), select: false });
    const { genre, tags, rating, minLength, maxLength } = state;
    const location = useRouter();
    const category = useSelector((state) => state.videoCategory.videoCategory);
    const {
        searchQuery,
        searchType,
        sortDate,
        sortRating,
        sortLength,
        sortMintuesWatched
    } = useSelector((state) => state.filter);
    const dis = useDispatch();
    const dateHandler = (val) => {
        setDate(val);
        setOpenDate(!openDate);
    };
    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        filterhandler();
    }, [sortDate, sortRating, sortLength, sortMintuesWatched]);
    const filterhandler = async () => {
        const { genre, tags, rating } = state;
        let query = `rating=[${rating}]`;
        if (location.pathname) {
            if (location.pathname === '/video') query = query + `&type=video`;
            else if (location.pathname === '/audio') query = query + `&type=album`;
            else if (location.pathname === '/search') {
                query = query + `&search=${searchQuery}`;
                if (searchType.toLowerCase() !== 'all')
                    if (searchType.toLowerCase() === 'audio') query = query + `&type=album`;
                    else if (searchType.toLowerCase() === 'video') query = query + `&type=video`;
            }
        }
        if (sortDate) query = query + `&sortDate=${sortDate}`;
        else if (sortRating) query = query + `&sortRating=${sortRating}`;
        else if (sortLength) query = query + `&sortLength=${sortLength}`;
        else if (sortMintuesWatched) query = query + `&sortMintuesWatched=${sortMintuesWatched}`;
        else if (location.pathname !== '/search') query = query + `&sortBy=${category}`;
        if (date) query = query + `&date=${date}`;
        else if (minDate.select)
            query = query + `&dateRange[]=${minDate.date}&dateRange[]=${maxDate.date}`;
        if (genre.length > 0) query = query + `&genre=${genre.join(',')}`;
        if (tags.length > 0) query = query + `&tags=${tags.join(',')}`;
        if (minLength.hour > 0 || minLength.min > 0 || maxLength.hour > 0 || maxLength.min > 0) {
            if (minLength.hour === 0 && minLength.min > 0)
                query =
                    query +
                    `&minDuration=${minLength.min > 9 ? minLength.min : '0' + minLength.min}:00`;
            else if (minLength.hour > 0 && minLength.min === 0)
                query =
                    query +
                    `&minDuration=${
                        minLength.hour > 9 ? minLength.hour : '0' + minLength.hour
                    }:00:00`;
            else if (minLength.hour > 0 && minLength.min > 0)
                query =
                    query +
                    `&minDuration=${
                        (minLength.hour > 9 ? minLength.hour : '0' + minLength.hour) +
                        ':' +
                        (minLength.min > 9 ? minLength.min : '0' + minLength.min)
                    }:00`;

            if (maxLength.hour === 0 && maxLength.min > 0)
                query =
                    query +
                    `&maxDuration=${maxLength.min > 9 ? maxLength.min : '0' + maxLength.min}:00`;
            else if (maxLength.hour > 0 && maxLength.min === 0)
                query =
                    query +
                    `&maxDuration=${
                        maxLength.hour > 9 ? maxLength.hour : '0' + maxLength.hour
                    }:00:00`;
            else if (maxLength.hour > 0 && maxLength.min > 0)
                query =
                    query +
                    `&maxDuration=${
                        (maxLength.hour > 9 ? maxLength.hour : '0' + maxLength.hour) +
                        ':' +
                        (maxLength.min > 9 ? maxLength.min : '0' + maxLength.min)
                    }:00`;
        }
        const { data } = await filterMedia(query);
        dis(filter(data.media));
        setOpen(false);
    };
    return (
        <div>
            <div
                className="sub-menu-bg rounded subheader-icon py-1 mx-2"
                ref={dropdownRef}
                onClick={() => setOpen(!open)}>
                <Icons.FaSlidersH color={'#B3ACCF'} className="pointer" size={19} />
            </div>
            <PopperUi
                className="search-filter w-100 "
                open={open}
                setOpen={() => setOpen(false)}
                anchorEl={dropdownRef.current}
                childClassName="p-2">
                <div className="container ">
                    <div className="search-filter__caret" />
                    <Label className="text-white form-input__label">Upload Date</Label>
                    {(date || minDate.select || maxDate.select) && (
                        <CloseIcon
                            onClick={() => {
                                setDate('');
                                setMinDate({ date: new Date(), select: false });
                                setMaxDate({ date: new Date(), select: false });
                            }}
                            className="search-filter__close"
                        />
                    )}
                    {/* <FormInput
											className="search-filter__select"
											label={true}
											title="Upload date"
											inputType="select"
											options={[ 'Today', 'This Week', 'This Month', 'This Year' ]}
										/> */}
                    <div>
                        <div
                            onClick={(event) => setOpenDate(!openDate)}
                            // ref={dateRef}
                            className="form-input__feild pointer d-flex justify-content-between align-items-center py-1">
                            <P1 className=" ml-3 mb-0">
                                {date ? date.toUpperCase() : 'Select Date'}
                            </P1>
                            <span className="text-white h4">&#9662;</span>
                        </div>
                        {openDate && (
                            <div className=" search-filter-date ">
                                <P1
                                    onClick={() => dateHandler('today')}
                                    className="text-light mb-0 pointer">
                                    Today
                                </P1>
                                <P1
                                    onClick={() => dateHandler('this week')}
                                    className="text-light mb-0 pointer">
                                    This Week
                                </P1>
                                <P1
                                    onClick={() => dateHandler('this month')}
                                    className="text-light mb-0 pointer">
                                    This Month
                                </P1>
                                <P1
                                    onClick={() => {
                                        dateHandler('this year');
                                    }}
                                    className="text-light mb-0 pointer">
                                    This Year
                                </P1>
                                <div className="d-flex align-items-center flex-wrap">
                                    <P1 className="mb-0 text-white">Custom Range:</P1>
                                    <div className="d-flex align-items center flex-wrap">
                                        <div>
                                            <DatePicker
                                                className="date-picker"
                                                onChange={(date) => {
                                                    setMinDate({ date: date, select: true });
                                                    setOpenDate(false);
                                                    setDate('');
                                                }}
                                                value={minDate.date}
                                            />
                                        </div>
                                        <div
                                            className="my-auto d-none d-md-block mx-1 mx-xl-3"
                                            style={{
                                                width: '15px',
                                                height: '1px',
                                                background: '#fff'
                                            }}
                                        />
                                        <div>
                                            <DatePicker
                                                className="date-picker"
                                                onChange={(date) => {
                                                    setMaxDate({ date: date, select: true });
                                                    setOpenDate(false);
                                                    setDate('');
                                                }}
                                                value={maxDate.date}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Label className="text-white form-input__label">Genre</Label>
                    <ChipInput
                        className={`mb-2 search-filter__chip chip-input `}
                        blurBehavior="ignore"
                        fullWidth
                        value={genre}
                        onAdd={(chip) => {
                            dispatch({ type: 'ADD_GENRE', value: chip });
                        }}
                        onDelete={(chip, index) => {
                            dispatch({ type: 'REMOVE_GENRE', value: index });
                        }}
                        variant="outlined"
                        placeholder="Genre"
                    />
                    <Label className="text-white form-input__label">Tags</Label>
                    <ChipInput
                        className={`mb-2 search-filter__chip chip-input `}
                        blurBehavior="ignore"
                        fullWidth
                        value={tags}
                        onAdd={(chip) => {
                            dispatch({ type: 'ADD_TAGS', value: chip });
                        }}
                        onDelete={(chip, index) => {
                            dispatch({ type: 'REMOVE_TAGS', value: index });
                        }}
                        variant="outlined"
                        placeholder="Tags"
                    />
                    <Label className="text-white form-input__label">Rating</Label>
                    <div className="search-filter-rating d-flex align-items-center">
                        <P1 className="mb-0 text-white text-nowrap ">
                            <Icons.FaStar color={'#fdb843'} size={15} className="mr-1" />
                            {rating[0]}-{rating[1]}
                        </P1>
                        <Slider
                            min={0}
                            max={5}
                            className="ml-4 search-filter-rating__slider"
                            value={rating}
                            onChange={(event, newValue) =>
                                dispatch({ type: 'RATING_CHANGE', value: newValue })
                            }
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                        />
                    </div>
                    <div className="search-filter__line my-2" />
                    <Label className="text-white form-input__label">Length</Label>
                    <div className="d-flex">
                        <Counter
                            value={minLength.hour}
                            onCounterUp={() =>
                                dispatch({
                                    type: 'MIN_COUNTER_CHANGE',
                                    name: 'hour',
                                    value: minLength.hour + 1
                                })
                            }
                            onCounterDown={() =>
                                dispatch({
                                    type: 'MIN_COUNTER_CHANGE',
                                    name: 'hour',
                                    value: minLength.hour > 0 ? minLength.hour - 1 : 0
                                })
                            }
                            className="mr-2"
                            title="Hours"
                        />
                        <div className="text-white mt-5">:</div>
                        <Counter
                            onCounterUp={() =>
                                dispatch({
                                    type: 'MIN_COUNTER_CHANGE',
                                    name: 'min',
                                    value: minLength.min + 1
                                })
                            }
                            onCounterDown={() =>
                                dispatch({
                                    type: 'MIN_COUNTER_CHANGE',
                                    name: 'min',
                                    value: minLength.min > 0 ? minLength.min - 1 : 0
                                })
                            }
                            value={minLength.min}
                            className="mx-2"
                            title="Mins"
                        />
                        <div className="search-filter__bar " />
                        <Counter
                            onCounterUp={() =>
                                dispatch({
                                    type: 'MAX_COUNTER_CHANGE',
                                    name: 'hour',
                                    value: maxLength.hour + 1
                                })
                            }
                            onCounterDown={() =>
                                dispatch({
                                    type: 'MAX_COUNTER_CHANGE',
                                    name: 'hour',
                                    value: maxLength.hour > 0 ? maxLength.hour - 1 : 0
                                })
                            }
                            value={maxLength.hour}
                            className="mx-2"
                            title="Hours"
                        />
                        <div className="text-white mt-5">:</div>
                        <Counter
                            onCounterUp={() =>
                                dispatch({
                                    type: 'MAX_COUNTER_CHANGE',
                                    name: 'min',
                                    value: maxLength.min + 1
                                })
                            }
                            onCounterDown={() =>
                                dispatch({
                                    type: 'MAX_COUNTER_CHANGE',
                                    name: 'min',
                                    value: maxLength.min > 0 ? maxLength.min - 1 : 0
                                })
                            }
                            value={maxLength.min}
                            className="mx-2"
                            title="Mins"
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={filterhandler}
                            className="btn btn-rounded  btn-primary btn-md">
                            Filter
                        </Button>
                    </div>
                    {/* <div className="search-filter__line my-2" />
										<Label className="text-white form-input__label">Mintues Watched</Label>
										<div className="d-flex">
											<Counter className="mr-2" title="Days" />
											<div className="text-white mt-5">:</div>
											<Counter className="mx-2" title="Hours" />
											<div className="text-white mt-5">:</div>
											<Counter className="mx-2" title="Mins" />
											<div className="search-filter__bar mx-3" />
											<Counter className="mx-2" title="Days" />
											<div className="text-white mt-5">:</div>
											<Counter className="mx-2" title="Hours" />
											<div className="text-white mt-5">:</div>
											<Counter className="mx-2" title="Mins" />
										</div>  */}
                </div>
            </PopperUi>
        </div>
    );
}
