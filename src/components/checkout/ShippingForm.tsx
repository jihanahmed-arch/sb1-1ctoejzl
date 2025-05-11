import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { z } from 'zod';

const shippingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  postalCode: z.string().regex(/^\d{4,6}$/, 'Invalid postal code format'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number format'),
  saveInfo: z.boolean()
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
  initialData?: Partial<ShippingFormData>;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit, initialData }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ShippingFormData>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
    saveInfo: true
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ShippingFormData, boolean>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    } else if (user?.shippingInfo) {
      setFormData(prev => ({ ...prev, ...user.shippingInfo }));
    }
  }, [initialData, user]);

  const validateField = (name: keyof ShippingFormData, value: string | boolean) => {
    try {
      shippingSchema.shape[name].parse(value);
      setErrors(prev => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    if (touched[name as keyof ShippingFormData]) {
      validateField(name as keyof ShippingFormData, newValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof ShippingFormData, formData[name as keyof ShippingFormData]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    const newErrors: Partial<Record<keyof ShippingFormData, string>> = {};
    
    Object.keys(formData).forEach(key => {
      const field = key as keyof ShippingFormData;
      try {
        shippingSchema.shape[field].parse(formData[field]);
      } catch (error) {
        if (error instanceof z.ZodError) {
          isValid = false;
          newErrors[field] = error.errors[0].message;
        }
      }
    });
    
    setErrors(newErrors);
    
    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.firstName
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-pink-500 focus:ring-pink-500'
            }`}
          />
          {errors.firstName && touched.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.lastName
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-pink-500 focus:ring-pink-500'
            }`}
          />
          {errors.lastName && touched.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Street Address*
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.address
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-pink-500 focus:ring-pink-500'
            }`}
          />
          {errors.address && touched.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City*
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.city
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-pink-500 focus:ring-pink-500'
            }`}
          />
          {errors.city && touched.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State/Province*
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.state
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-pink-500 focus:ring-pink-500'
            }`}
          />
          {errors.state && touched.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            ZIP/Postal Code*
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.postalCode
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-pink-500 focus:ring-pink-500'
            }`}
          />
          {errors.postalCode && touched.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
          )}
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country*
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.country
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-pink-500 focus:ring-pink-500'
            }`}
          />
          {errors.country && touched.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number*
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.phone
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-pink-500 focus:ring-pink-500'
            }`}
          />
          {errors.phone && touched.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="saveInfo"
          name="saveInfo"
          checked={formData.saveInfo}
          onChange={handleChange}
          className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
        />
        <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
          Save this information for future purchases
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;