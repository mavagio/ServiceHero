/**
 *
 * ListingEditor
 *
 */
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Listing } from 'types';
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  Divider,
  TimePicker,
} from 'antd';
import { ListingType } from 'types';
import { TIME_FORMAT } from 'types/consts';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { listingManagerActions } from 'app/containers/ListingManager/slice';
import {
  selectIsSuccess,
  selectError,
  selectLoading,
} from 'app/containers/ListingManager/selectors';
import { listingEditorModalActions } from 'app/containers/ListingEditorModal/slice';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = TimePicker;

interface Props {
  listing?: Listing | null;
}

export function ListingEditor({ listing }: Props) {
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const isSuccess = useSelector(selectIsSuccess);

  useEffect(() => {
    dispatch(listingManagerActions.reset());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(listingEditorModalActions.closeModal());
    }
  }, [isSuccess, dispatch, listing]);

  const onFinish = values => {
    values.availability = values?.availability.map(m => m.format(TIME_FORMAT));
    values.hourlyRate = parseInt(values.hourlyRate);
    if (listing) {
      dispatch(
        listingManagerActions.editListing({
          id: listing._id,
          listingDto: values,
        }),
      );
    } else {
      dispatch(listingManagerActions.addListing(values));
    }
  };

  return (
    <Wrapper>
      <Container>
        <Divider>
          <Title level={4}>{listing ? 'Edit' : 'Add new'} listing</Title>
        </Divider>
        {error && <Error>Incorrect request, please try again</Error>}
        <Form
          name="basic"
          onFinish={onFinish}
          size="large"
          initialValues={{
            type: listing?.type,
            description: listing?.description,
            hourlyRate: listing?.hourlyRate,
            availability: listing?.availability
              ? [
                  moment(listing?.availability[0], TIME_FORMAT),
                  moment(listing?.availability[1], TIME_FORMAT),
                ]
              : [],
          }}
        >
          <Form.Item
            name="type"
            hasFeedback
            rules={[{ required: true, message: 'Please select service type.' }]}
          >
            <Select placeholder="Service type">
              {Object.values(ListingType).map(type => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: 'Please service description',
              },
            ]}
          >
            <Input.TextArea placeholder="Description" maxLength={140} />
          </Form.Item>

          <Form.Item
            name="hourlyRate"
            rules={[
              {
                required: true,
                message: 'Please input your hour rate',
              },
            ]}
          >
            <Input placeholder="Hourly rate €" type="number" />
          </Form.Item>

          <Form.Item
            name="availability"
            label="Availability"
            rules={[
              { required: true, message: 'Please select your availability' },
            ]}
          >
            <RangePicker style={{ float: 'right' }} format={TIME_FORMAT} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Wrapper>
  );
}

const Error = styled.div`
  color: ${props => props.theme['error-color']};
  padding: 20px 0px;
`;

const Container = styled.div`
  width: 400px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
