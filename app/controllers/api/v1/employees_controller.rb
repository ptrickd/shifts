module Api
    module V1

class EmployeesController < ApplicationController
  before_action :set_employee, only: %i[ show update destroy ]

  # GET /employees
  # GET /employees.json
  def index
    @employees = Employee.all

    render json: @employees
  end

  # GET /employees/1
  # GET /employees/1.json
  def show
    render json: @employee
  end

  # POST /employees
  # POST /employees.json
  def create
    @employee = Employee.new(employee_params)

    if @employee.save
      render :show, status: :created, location: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /employees/1
  # PATCH/PUT /employees/1.json
  def update
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors, status: :unprocessable_entity
    end
  end

  # DELETE /employees/1
  # DELETE /employees/1.json
  def destroy
    @employee.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_employee
      @employee = Employee.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def employee_params
      params.require(:employee).permit(:is_active, :position, :first_name, :last_name, :display_name)
    end
end


    end
end

