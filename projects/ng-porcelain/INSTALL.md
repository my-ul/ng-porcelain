# Install Porcelain and its dependencies

```bash
npm install --save @my-ul/ng-porcelain \
	@fortawesome/angular-fontawesome@0.3.0 \
	@fortawesome/fontawesome-svg-core@1.2.15 \
	@fortawesome/free-solid-svg-icons@5.7.2 \
	@w11k/angular-sticky-things@1.1.2 \
	moment@2.24.0 \
	mydatepicker@2.6.6 \
	lodash-es@~4.17.11 \
	uuid@latest
```

# Import and use Porcelain modules

```typescript
import {
	ApplicatorModule,
	DateRefinerModule,
	FooterModule,
	InterpolateModule,
	RefinersModule,
	SearchInputModule
	SimpleRefinerModule,
	SpinnerModule,
	TruncateModule
} from '@my-ul/ng-porcelain';

// YourModule.ts
@Module({
	imports: [
		ApplicatorModule,
		DateRefinerModule,
		FooterModule,
		InterpolateModule,
		RefinersModule,
		SearchInputModule,
		SimpleRefinerModule,
		SpinnerModule,
		TruncateModule
	]
})
export class AppModule {}
```
