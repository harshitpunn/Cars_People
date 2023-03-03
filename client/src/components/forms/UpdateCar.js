import { Form, Input, Button, InputNumber, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CAR, GET_CARS } from '../../queries';
import { forEach } from 'lodash';

const { Option } = Select;

const UpdateCar = (props) => {
  const [updateCar] = useMutation(UPDATE_CAR);
  const { id, company, model, year, price, personId, people } = props;

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const checkTouched = (fieldName) => {
    return form.isFieldTouched(fieldName);
  };

  const onFinish = (values) => {
    const { company, model, year, price, personId } = values;
    const currentPersonId = props.personId;
    const newPersonId = personId;
    const idArray = [currentPersonId, newPersonId];

    if (currentPersonId !== newPersonId) {
      forEach(idArray, (i) => {
        updateCar({
          variables: {
            id,
            company,
            model,
            year,
            price,
            personId,
          },
          refetchQueries: [{ query: GET_CARS, variables: { personId: i } }],
        });
      });
    } else {
      updateCar({
        variables: {
          id,
          company,
          model,
          year,
          price,
          personId,
        },
      });
    }

    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="car-form-update"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        company: company,
        model: model,
        year: year,
        price: price,
        personId: personId,
      }}
    >
      <Form.Item
        name="company"
        style={{ marginBottom: '10px', width: '22%' }}
        rules={[{ required: true, message: 'Please input car company!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="model"
        style={{ marginBottom: '10px', width: '22%' }}
        rules={[{ required: true, message: 'Please input car model!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="year"
        style={{ marginBottom: '10px' }}
        rules={[{ required: true, message: 'Please input car year!' }]}
      >
        <InputNumber max={2023} min={100} />
      </Form.Item>

      <Form.Item
        name="price"
        style={{ marginBottom: '10px' }}
        rules={[{ required: true, message: 'Please input car price!' }]}
      >
        <InputNumber
          min={1000}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Form.Item
        name="personId"
        style={{ marginBottom: '8px', width: '18%' }}
        rules={[{ required: true, message: 'Please select person ID!' }]}
      >
        <Select>
          {people.map((person) => (
            <Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!checkTouched('company') &&
                !checkTouched('model') &&
                !checkTouched('year') &&
                !checkTouched('price') &&
                !checkTouched('personId')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button type="danger" onClick={props.onButtonClick}>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateCar;
