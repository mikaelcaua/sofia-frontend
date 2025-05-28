'use client'
import { useAuth } from '@/context/auth_context';
import {RoleInterface} from '@/interfaces/role_interface';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const RoleSelectionScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const roles: RoleInterface[] = user?.roles || [];

  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const goToRoleSelect = (roleId: number,) => {
    setSelectedRole(roleId);
    router.push("/teleconsulting");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl mb-2">
            Selecionar Vínculo
          </h1>
          <p>
            Por favor, selecione o vínculo com o qual você deseja trabalhar nesta sessão
          </p>
        </div>

        <div className="rounded-lg">
          <div className="flex px-6 py-3 bg-[#F0F0F0] border-b border-gray-200 text-secondary-blue">
            <div className="flex-1">VÍNCULO</div>
            <div className="flex-1 text-center">STATUS</div>
            <div className="flex-1">DESCRIÇÃO</div>
            <div className="flex-1"></div>
          </div>

          {roles.map((role) => (
            <div key={role.id} className="flex px-6 py-4 border-b border-gray-100 hover:bg-gray-50 items-center">
              <div className="flex-1 text-secondary-blue">
                {role.name}
              </div>

              <div className="flex-1 flex justify-center">
                <span className={`px-10 py-2 rounded-md text-sm ${role.status === 'SIM'
                  ? 'bg-[#00A91C] text-white'
                  : 'bg-red-500 text-white'
                  }`}>
                  {role.status}
                </span>
              </div>

              <div className="flex-1 text-secondary-blue">
                <span>{role.description}</span>
              </div>

              <div className="flex-1 flex justify-center">
                <button
                  onClick={() => goToRoleSelect(role.id)}
                  className="px-4 py-2 rounded-md text-sm transition-colors bg-blue-500 text-white hover:bg-blue-600">
                  Selecionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RoleSelectionScreen;