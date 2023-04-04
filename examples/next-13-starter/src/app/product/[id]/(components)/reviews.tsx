import { headers } from 'next/headers';
import { api } from 'trpc-api';
import { ProductReviewCard } from '~/components/product-review-card';
import { RouterOutputs } from '~/trpc/shared';
import { CreateReviewForm } from './create-review-form';

export async function Reviews(props: {
  productId: string;
  data: Promise<RouterOutputs['reviews']['list']>;
}) {
  const reviews = await props.data;

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-white">Customer Reviews</div>
      <div className="space-y-4">
        <div className="text-lg font-medium text-white">Write a Review</div>
        <CreateReviewForm
          productId={props.productId}
          handleSubmit={async (text, rating) => {
            'use server';
            // const review = await api.reviews.create.mutate({
            //   productId: props.productId,
            //   rating,
            //   text,
            // });
            const json = await (
              await fetch('http://localhost:3000/api/trpc/reviews.create', {
                headers: headers(),
              })
            ).json();
            console.log('server says review', { json });
          }}
        />
      </div>
      <div className="space-y-8">
        {reviews.map((review) => {
          return <ProductReviewCard key={review.id} review={review} />;
        })}
      </div>
    </div>
  );
}

export function ReviewsSkeleton(props: { n?: number }) {
  return (
    <div className="space-y-6">
      <div className="relative h-7 w-2/5 overflow-hidden rounded-lg bg-gray-900 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent" />
      <div className="space-y-8">
        {Array.from({ length: props.n ?? 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-6 w-2/6 rounded-lg bg-gray-900" />
            <div className="h-4 w-1/6 rounded-lg bg-gray-900" />
            <div className="h-4 w-full rounded-lg bg-gray-900" />
            <div className="h-4 w-4/6 rounded-lg bg-gray-900" />
          </div>
        ))}
      </div>
    </div>
  );
}