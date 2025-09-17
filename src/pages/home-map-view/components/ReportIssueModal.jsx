import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ReportIssueModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    city: '',
    coordinates: { lat: 20.5937, lng: 78.9629 },
    photo: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: 'roads', label: 'Roads & Infrastructure' },
    { value: 'garbage', label: 'Garbage Collection' },
    { value: 'water', label: 'Water Supply' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'drainage', label: 'Drainage & Sewage' },
    { value: 'streetlights', label: 'Street Lights' },
    { value: 'parks', label: 'Parks & Recreation' },
    { value: 'traffic', label: 'Traffic Management' },
    { value: 'other', label: 'Other' }
  ];

  const cityOptions = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'pune', label: 'Pune' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'lucknow', label: 'Lucknow' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          photo: 'File size must be less than 5MB'
        }));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photo: e?.target?.result
        }));
      };
      reader?.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData?.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData?.city) {
      newErrors.city = 'City is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const reportData = {
        ...formData,
        id: Date.now()?.toString(),
        status: 'pending',
        created_at: new Date()?.toISOString(),
        photo_url: formData?.photo || `https://picsum.photos/400/300?random=${Date.now()}`
      };
      
      if (onSubmit) {
        onSubmit(reportData);
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        city: '',
        coordinates: { lat: 20.5937, lng: 78.9629 },
        photo: null
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              lat: position?.coords?.latitude,
              lng: position?.coords?.longitude
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg shadow-civic-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Report an Issue</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isSubmitting}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Issue Title"
            type="text"
            placeholder="Brief description of the issue"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            error={errors?.title}
            required
            disabled={isSubmitting}
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              placeholder="Provide detailed information about the issue"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              disabled={isSubmitting}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md text-foreground bg-input placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                errors?.description ? 'border-error' : 'border-border'
              }`}
            />
            {errors?.description && (
              <p className="mt-1 text-sm text-error">{errors?.description}</p>
            )}
          </div>
          
          <Select
            label="Category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            placeholder="Select issue category"
            error={errors?.category}
            required
            disabled={isSubmitting}
          />
          
          <Select
            label="City"
            options={cityOptions}
            value={formData?.city}
            onChange={(value) => handleInputChange('city', value)}
            placeholder="Select your city"
            error={errors?.city}
            required
            disabled={isSubmitting}
            searchable
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md">
                {formData?.coordinates?.lat?.toFixed(4)}, {formData?.coordinates?.lng?.toFixed(4)}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGetLocation}
                disabled={isSubmitting}
                iconName="MapPin"
                iconPosition="left"
                iconSize={16}
              >
                Get Location
              </Button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Photo (Optional)
            </label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isSubmitting}
                className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer cursor-pointer"
              />
              {formData?.photo && (
                <div className="relative">
                  <img
                    src={formData?.photo}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleInputChange('photo', null)}
                    disabled={isSubmitting}
                    className="absolute top-2 right-2"
                    iconName="X"
                    iconSize={16}
                  />
                </div>
              )}
              {errors?.photo && (
                <p className="text-sm text-error">{errors?.photo}</p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="flex-1"
            >
              Submit Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssueModal;