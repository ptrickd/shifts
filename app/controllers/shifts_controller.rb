class ShiftsController < ApplicationController
  before_action :set_shift, only: %i[ show update destroy ]

  # GET /shifts
  # GET /shifts.json
  def index
    @shifts = Shift.all
  end

  # GET /shifts/1
  # GET /shifts/1.json
  def show
  end

  # POST /shifts
  # POST /shifts.json
  def create
    @shift = Shift.new(shift_params)

    if @shift.save
      render :show, status: :created, location: @shift
    else
      render json: @shift.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /shifts/1
  # PATCH/PUT /shifts/1.json
  def update
    if @shift.update(shift_params)
      render :show, status: :ok, location: @shift
    else
      render json: @shift.errors, status: :unprocessable_entity
    end
  end

  # DELETE /shifts/1
  # DELETE /shifts/1.json
  def destroy
    @shift.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shift
      @shift = Shift.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def shift_params
      params.require(:shift).permit(:employee_id, :date, :start_time, :end_time, :is_split_shift)
    end
end
