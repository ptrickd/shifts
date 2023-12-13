module Api
  module V1
    class ShiftsController < ApplicationController
      before_action :set_shift, only: %i[show update destroy]
      # before_action :print_params, only: %i[create]
      # GET /shifts
      # GET /shifts.json
      def index
        #get all shifts where the week_start with the given query params
        @shifts = Shift.where(["week_start = :u", { u: params[:week_start] }])

        render json: @shifts
      end

      # GET /shifts/1
      # GET /shifts/1.json
      def show
        render json: @shift
      end

      # POST /shifts
      # POST /shifts.json
      def create
        @shift = Shift.new(shift_params)

        if @shift.save
          render json: @shift
        else
          render json: @shift.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /shifts/1
      # PATCH/PUT /shifts/1.json
      def update
        if @shift.update(shift_params)
          render json: @shift
        else
          render json: @shift.errors, status: :unprocessable_entity
        end
      end

      # DELETE /shifts/1
      # DELETE /shifts/1.json
      def destroy
        if @shift.destroy
          render json: @shift
        else
          render json: @shift.errors, status: :unprocessable_entity
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_shift
        @shift = Shift.find(params[:id])
      end

      def print_params
        Rails.logger.debug "shift_params"
        Rails.logger.debug shift_params.inspect
      end

      # Only allow a list of trusted parameters through.
      def shift_params
        params.require(:shift).permit(
          :employee_id,
          :date,
          :start_time,
          :end_time,
          :is_split_shift,
          :week_start
        )
      end
    end
  end
end
