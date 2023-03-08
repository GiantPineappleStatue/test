import Link from 'next/link';
const Brand = ({ movie }) => (
    <Link href={movie || '/'}>
        <a className="">
            <img src="/img/artbot-logo.png" className="brand" alt="artbot" />
        </a>
    </Link>
);

export default Brand;
