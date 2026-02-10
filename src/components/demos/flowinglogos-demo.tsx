import { FlowingLogos } from '@/components/ui/flowing-logos';

export default function FlowingLogosDemo() {
  return (
    <FlowingLogos
      data={[
        { image: '/assets/logos/microsoft.jpg', name: 'Microsoft' },
        { image: '/assets/logos/apple.jpg', name: 'Apple' },
        { image: '/assets/logos/amazon.jpg', name: 'Amazon' },
        { image: '/assets/logos/netflix.jpg', name: 'Netflix' },
        { image: '/assets/logos/samsung.jpg', name: 'Samsung' },
        {
          image:
            'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
          name: 'GitHub',
        },
        { image: '/assets/logos/tesla.jpg', name: 'Tesla' },
        { image: '/assets/logos/meta.jpg', name: 'Meta' },
        { image: '/assets/logos/openai.jpg', name: 'OpenAI' },
        { image: '/assets/logos/nvidia.jpg', name: 'NVIDIA' },
        { image: '/assets/logos/intel.jpg', name: 'Intel' },
        { image: '/assets/logos/sony.jpg', name: 'Sony' },
        { image: '/assets/logos/paypal.jpg', name: 'PayPal' },
        { image: '/assets/logos/uber.jpg', name: 'Uber' },
        { image: '/assets/logos/stripe.jpg', name: 'Stripe' },
      ]}
    />
  );
}
