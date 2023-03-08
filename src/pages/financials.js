import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import P1 from '../components/UI/P1/P1';
import FinancialUpperCard from '../components/FinancialUpperCard/FinancialUpperCard';
// import FinancialRevenueDistribution from '../../../components/FinancialRevenueDistribution/FinancialRevenueDistribution';
import Layout from '../components/Layout/Layout';
export default () => (
    <Layout title="ArtBot Financials">
        <div className="container-fluid financials ">
            {/** Financial Page Head Section */}
            <div id="financial-page-head " className=" container">
                <Typography
                    variant="h4"
                    component="h4"
                    className="text-white font-weight-normal text-center">
                    Revenue Streams
                </Typography>
                <P1 className="mt-2 mb-0  financials-head__text text-center mx-sm-5 px-sm-5">
                    Here we explain all the different ways that creators and consumers will be able
                    to earn money through ArtBot.
                </P1>
            </div>

            {/** Financial Page Creator and Card Section */}
            <FinancialUpperCard />

            {/** Financial Page Revenue Distribution Section */}
            {/* <FinancialRevenueDistribution /> */}
        </div>
    </Layout>
);
