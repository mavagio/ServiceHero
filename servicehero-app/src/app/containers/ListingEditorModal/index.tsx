/**
 *
 * ListingEditorModal
 *
 */

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from 'utils/redux-injectors';
import { reducer, sliceKey, listingEditorModalActions } from './slice';
import { ListingEditor } from 'app/components/ListingEditor';
import { Modal } from 'antd';
import { selectIsOpen, selectListing } from './selectors';

interface Props {}

export function ListingEditorModal(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });

  const isOpen = useSelector(selectIsOpen);
  const listing = useSelector(selectListing);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(listingEditorModalActions.closeModal());
  };

  return (
    <Modal
      visible={isOpen}
      footer={null}
      centered={true}
      onCancel={onClose}
      closable={false}
      forceRender={true}
    >
      <ListingEditor key={listing?._id} listing={listing} />
    </Modal>
  );
}
