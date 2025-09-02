import React from 'react';
import { Form, Input, Select, Switch, DatePicker, InputNumber, Upload, Button } from 'antd';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

// Base validated field component
interface ValidatedFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  tooltip?: string;
  className?: string;
  children?: React.ReactNode;
}

// Validated Input component
export function ValidatedInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  tooltip,
  className,
  ...props
}: ValidatedFieldProps<T> & {
  type?: 'text' | 'email' | 'password' | 'url' | 'tel';
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  maxLength?: number;
  showCount?: boolean;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          required={required}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
          tooltip={tooltip}
          className={className}
        >
          <Input
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            status={error ? 'error' : ''}
            {...props}
          />
        </Form.Item>
      )}
    />
  );
}

// Validated Password Input component
export function ValidatedPasswordInput<T extends FieldValues>({
  control,
  name,
  label = 'Password',
  placeholder = 'Enter password',
  disabled = false,
  required = false,
  tooltip,
  className
}: ValidatedFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          required={required}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
          tooltip={tooltip}
          className={className}
        >
          <Input.Password
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            status={error ? 'error' : ''}
          />
        </Form.Item>
      )}
    />
  );
}

// Validated TextArea component
export function ValidatedTextArea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  tooltip,
  className,
  ...props
}: ValidatedFieldProps<T> & {
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          required={required}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
          tooltip={tooltip}
          className={className}
        >
          <TextArea
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            status={error ? 'error' : ''}
            {...props}
          />
        </Form.Item>
      )}
    />
  );
}

// Validated Select component
export function ValidatedSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Please select',
  disabled = false,
  required = false,
  tooltip,
  className,
  options,
  ...props
}: ValidatedFieldProps<T> & {
  options: Array<{ label: string; value: any; disabled?: boolean }>;
  mode?: 'multiple' | 'tags';
  allowClear?: boolean;
  showSearch?: boolean;
  filterOption?: boolean | ((input: string, option: any) => boolean);
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          required={required}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
          tooltip={tooltip}
          className={className}
        >
          <Select
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            status={error ? 'error' : ''}
            {...props}
          >
            {options.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
    />
  );
}

// Validated Switch component
export function ValidatedSwitch<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  tooltip,
  className,
  ...props
}: ValidatedFieldProps<T> & {
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  size?: 'small' | 'default';
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
          tooltip={tooltip}
          className={className}
          valuePropName="checked"
        >
          <Switch
            checked={value}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
        </Form.Item>
      )}
    />
  );
}

// Validated DatePicker component
export function ValidatedDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  tooltip,
  className,
  ...props
}: ValidatedFieldProps<T> & {
  format?: string;
  showTime?: boolean;
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          required={required}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
          tooltip={tooltip}
          className={className}
        >
          <DatePicker
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            status={error ? 'error' : ''}
            className="w-full"
            {...props}
          />
        </Form.Item>
      )}
    />
  );
}

// Validated InputNumber component
export function ValidatedInputNumber<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  tooltip,
  className,
  ...props
}: ValidatedFieldProps<T> & {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  formatter?: (value: number | string | undefined) => string;
  parser?: (displayValue: string | undefined) => number | string;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          required={required}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
          tooltip={tooltip}
          className={className}
        >
          <InputNumber
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            status={error ? 'error' : ''}
            className="w-full"
            {...props}
          />
        </Form.Item>
      )}
    />
  );
}

// Validated Upload component
export function ValidatedUpload<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  required = false,
  tooltip,
  className,
  ...props
}: ValidatedFieldProps<T> & {
  accept?: string;
  multiple?: boolean;
  maxCount?: number;
  listType?: 'text' | 'picture' | 'picture-card';
  action?: string;
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<void>;
  onChange?: (info: any) => void;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Form.Item
          label={label}
          required={required}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
          tooltip={tooltip}
          className={className}
        >
          <Upload
            fileList={value || []}
            onChange={(info) => {
              onChange(info.fileList);
              props.onChange?.(info);
            }}
            disabled={disabled}
            {...props}
          >
            <Button icon={<UploadOutlined />} disabled={disabled}>
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>
      )}
    />
  );
}

// Validated form wrapper component
interface ValidatedFormProps {
  children: React.ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelCol?: { span: number };
  wrapperCol?: { span: number };
  disabled?: boolean;
  loading?: boolean;
}

export function ValidatedForm({
  children,
  onSubmit,
  className,
  layout = 'vertical',
  labelCol,
  wrapperCol,
  disabled = false,
  loading = false
}: ValidatedFormProps) {
  return (
    <Form
      layout={layout}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      onFinish={onSubmit}
      className={className}
      disabled={disabled || loading}
    >
      {children}
    </Form>
  );
}

// Form section component for organizing large forms
interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export function FormSection({
  title,
  description,
  children,
  collapsible = false,
  defaultCollapsed = false
}: FormSectionProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <div className="form-section border border-gray-200 rounded-lg p-6 mb-6">
      <div className="form-section-header mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          {collapsible && (
            <Button
              type="text"
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-400"
            >
              {collapsed ? 'Expand' : 'Collapse'}
            </Button>
          )}
        </div>
      </div>
      {!collapsed && (
        <div className="form-section-content">
          {children}
        </div>
      )}
    </div>
  );
}

// Form actions component
interface FormActionsProps {
  onCancel?: () => void;
  onReset?: () => void;
  submitText?: string;
  cancelText?: string;
  resetText?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormActions({
  onCancel,
  onReset,
  submitText = 'Save',
  cancelText = 'Cancel',
  resetText = 'Reset',
  loading = false,
  disabled = false,
  className = ''
}: FormActionsProps) {
  return (
    <div className={`form-actions flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 ${className}`}>
      {onReset && (
        <Button onClick={onReset} disabled={disabled || loading}>
          {resetText}
        </Button>
      )}
      {onCancel && (
        <Button onClick={onCancel} disabled={loading}>
          {cancelText}
        </Button>
      )}
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        disabled={disabled}
      >
        {submitText}
      </Button>
    </div>
  );
}