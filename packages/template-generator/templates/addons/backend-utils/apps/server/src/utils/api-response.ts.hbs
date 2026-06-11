export type ApiSuccess<T> = {
	success: true;
	status: number;
	data: T;
	message?: string;
};

export type ApiFailure = {
	success: false;
	status: number;
	error: string;
	details?: unknown;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

/**
 * Standardized, type-safe API response payloads with static factory methods.
 */
export class ApiResponse {
	static ok<T>(data: T, message?: string): ApiSuccess<T> {
		return ApiResponse.success(200, data, message);
	}

	static created<T>(data: T, message?: string): ApiSuccess<T> {
		return ApiResponse.success(201, data, message);
	}

	static badRequest(error = "Bad Request", details?: unknown): ApiFailure {
		return ApiResponse.failure(400, error, details);
	}

	static unauthorized(error = "Unauthorized", details?: unknown): ApiFailure {
		return ApiResponse.failure(401, error, details);
	}

	static forbidden(error = "Forbidden", details?: unknown): ApiFailure {
		return ApiResponse.failure(403, error, details);
	}

	static notFound(error = "Not Found", details?: unknown): ApiFailure {
		return ApiResponse.failure(404, error, details);
	}

	static conflict(error = "Conflict", details?: unknown): ApiFailure {
		return ApiResponse.failure(409, error, details);
	}

	static unprocessable(error = "Unprocessable Entity", details?: unknown): ApiFailure {
		return ApiResponse.failure(422, error, details);
	}

	static internal(error = "Internal Server Error", details?: unknown): ApiFailure {
		return ApiResponse.failure(500, error, details);
	}

	static success<T>(status: number, data: T, message?: string): ApiSuccess<T> {
		return {
			success: true,
			status,
			data,
			...(message !== undefined ? { message } : {}),
		};
	}

	static failure(status: number, error: string, details?: unknown): ApiFailure {
		return {
			success: false,
			status,
			error,
			...(details !== undefined ? { details } : {}),
		};
	}
}

/**
 * Throw from any handler to produce a structured HTTP error response via the
 * global error handler.
 */
export class ApiError extends Error {
	readonly status: number;
	readonly details?: unknown;

	constructor(status: number, message: string, details?: unknown) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		if (details !== undefined) {
			this.details = details;
		}
	}
}
