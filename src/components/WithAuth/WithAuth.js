export default function withAuth(Component) {
    const withAuth = (props) => {
        console.log(props);
        return <Component {...props} />;
    };

    withAuth.getInitialProps = async (ctx) => {
        return { ctx: ctx };
    };

    return withAuth;
}
