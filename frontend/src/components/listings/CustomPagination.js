import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';

import Listing from '../listings/Listing';
import Spinner from '../spinner/Spinner';

import { updateStorePageNumber } from '../../actions/listing';

const CustomPagination = ({
  listingReducer: { allListings, listingsCount, storePageNumber },
  updateStorePageNumber
}) => {
  const handlePageTurn = number => {
    updateStorePageNumber(number);
  };

  // getAllListings was called in AllListings component so we have the data we need in listingReducer.
  // We need to create slices of jsx, the number of divs corresponding to how many
  // listings we want to render on a page, depending on screen size.
  // This is for xs to md screen sizes.
  const renderListingsSmallerScreens = () => {
    let listingsPerPage = [];
    const chunk = 3;
    let temparray;
    for (
      let listingNumber = 0, j = allListings.length;
      listingNumber < j;
      listingNumber += chunk
    ) {
      temparray = allListings.slice(listingNumber, listingNumber + chunk);
      listingsPerPage.push(
        temparray.map(listing => (
          <div key={listing.id} className='col-md-6 col-lg-4 mb-5'>
            <Listing listing={listing} />
          </div>
        ))
      );
    }
    return listingsPerPage;
  };

  // Amount of listings for larger screens
  const renderListingsLargerScreens = () => {
    let listingsPerPage = [];
    const chunk = 6;
    let temparray;
    for (
      let listingNumber = 0, j = allListings.length;
      listingNumber < j;
      listingNumber += chunk
    ) {
      temparray = allListings.slice(listingNumber, listingNumber + chunk);
      listingsPerPage.push(
        temparray.map(listing => (
          <div key={listing.id} className='col-md-6 col-lg-4 mb-5'>
            <Listing listing={listing} />
          </div>
        ))
      );
    }
    return listingsPerPage;
  };

  // Amount of pages for xs to md screen sizes
  const renderPagesSmallerScreens = () => {
    const amountOfListingsPerPageXsToMd = 3;
    let xAmountOfPages = listingsCount / amountOfListingsPerPageXsToMd;
    xAmountOfPages = Math.ceil(xAmountOfPages);
    let pages = [];
    for (
      let pageNumber = 1, j = xAmountOfPages;
      pageNumber <= j;
      pageNumber++
    ) {
      pages.push(
        <PageItem
          key={pageNumber}
          active={pageNumber === storePageNumber}
          onClick={() => handlePageTurn(pageNumber)}
        >
          {pageNumber}
        </PageItem>
      );
    }
    return pages;
  };

  // Amount of pages for lg and above sreen sizes
  const renderPagesBiggerScreens = () => {
    const amountOfListingsPerPageLgAndAbove = 6;
    let xAmountOfPages = listingsCount / amountOfListingsPerPageLgAndAbove;
    xAmountOfPages = Math.ceil(xAmountOfPages);
    if (xAmountOfPages <= 1) {
      return;
    }
    let pages = [];
    for (
      let pageNumber = 1, j = xAmountOfPages;
      pageNumber <= j;
      pageNumber++
    ) {
      pages.push(
        <PageItem
          key={pageNumber}
          active={pageNumber === storePageNumber}
          onClick={() => handlePageTurn(pageNumber)}
        >
          {pageNumber}
        </PageItem>
      );
    }
    return pages;
  };

  return (
    <Fragment>
      <div className='listings-per-page d-lg-none row m-auto mr-0'>
        {!allListings ? (
          <Spinner />
        ) : (
          renderListingsSmallerScreens()[storePageNumber - 1]
        )}
      </div>
      <div className='listings-per-page d-none d-lg-flex row m-auto'>
        {!allListings ? (
          <Spinner />
        ) : (
          renderListingsLargerScreens()[storePageNumber - 1]
        )}
      </div>
      <Pagination
        className='d-lg-none'
        style={{ justifyContent: 'center' }}
        size='lg'
      >
        {renderPagesSmallerScreens()}
      </Pagination>
      <Pagination
        className='d-none d-lg-flex'
        style={{ justifyContent: 'center' }}
        size='lg'
      >
        {renderPagesBiggerScreens()}
      </Pagination>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  listingReducer: state.listingReducer
});

export default connect(mapStateToProps, { updateStorePageNumber })(
  CustomPagination
);
