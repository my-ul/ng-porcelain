# Install Porcelain and its dependencies

It is assumed that you have already used the Angular CLI to install and instantiate an Angular application. Refer to the [Angular documentation](https://angular.io/guide/setup-local) for help setting up an Angular project.

{{install-command}}

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
